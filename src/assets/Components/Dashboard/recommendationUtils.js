import { studentData } from "./BrowseStudents/studentData";
import { calculateMatchScore, calculateRecommendationScore } from "./BrowseStudents/matchUtils";

function asArray(value) {
    return Array.isArray(value) ? value : [];
}

function asText(value) {
    return typeof value === "string" ? value.trim() : "";
}

function getPostDate(post) {
    const time = new Date(post?.createdAt || 0).getTime();
    return Number.isFinite(time) ? time : 0;
}

export function getKnownSkills(students = studentData) {
    return [...new Map(
        asArray(students)
            .flatMap((student) => [
                ...asArray(student?.skills),
                ...asArray(student?.interests)
            ])
            .map((skill) => asText(skill))
            .filter(Boolean)
            .map((skill) => [skill.toLowerCase(), skill])
    ).values()];
}

function searchablePostText(post) {
    return [
        post?.title,
        post?.description,
        post?.skillsNeeded,
        post?.skills,
        post?.helpNeeded,
        post?.projectDescription
    ].flatMap((value) => Array.isArray(value) ? value : [value])
        .map(asText)
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

function skillMatchesText(skill, text) {
    const normalizedSkill = skill.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const normalizedText = text.replace(/[^a-z0-9]+/g, " ");
    if (!normalizedSkill) return false;
    if (` ${normalizedText} `.includes(` ${normalizedSkill} `)) return true;
    return normalizedSkill.length >= 5 && normalizedText.replaceAll(" ", "").includes(normalizedSkill.replaceAll(" ", ""));
}

export function extractRequiredSkills(post, students = studentData) {
    if (!post || typeof post !== "object") return [];
    const text = searchablePostText(post);
    return getKnownSkills(students).filter((skill) => skillMatchesText(skill, text));
}

export function normalizePosts(posts) {
    return asArray(posts)
        .filter((post) => post && typeof post === "object")
        .map((post) => ({
            ...post,
            detectedSkills: asArray(post.detectedSkills).length
                ? [...new Set(post.detectedSkills.filter((skill) => typeof skill === "string"))]
                : extractRequiredSkills(post)
        }))
        .sort((a, b) => getPostDate(b) - getPostDate(a));
}

export function getTrendingSkills(posts, students = studentData) {
    const counts = new Map();
    normalizePosts(posts).forEach((post) => {
        const skills = post.detectedSkills.length ? post.detectedSkills : extractRequiredSkills(post, students);
        new Set(skills).forEach((skill) => {
            const key = skill.toLowerCase();
            const current = counts.get(key);
            counts.set(key, { name: current?.name || skill, count: (current?.count || 0) + 1 });
        });
    });

    return [...counts.values()]
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
        .slice(0, 4)
        .map((skill) => ({
            ...skill,
            icon: "bi bi-code-slash",
            status: `${skill.count} ${skill.count === 1 ? "request" : "requests"}`
        }));
}

export function getRecommendationContext(posts, currentUser = {}) {
    const profile = currentUser || {};
    const recentPosts = normalizePosts(posts);
    const requiredSkillWeights = new Map();

    recentPosts.forEach((post, index) => {
        const weight = Math.pow(0.45, index);
        post.detectedSkills.forEach((skill) => {
            const key = skill.toLowerCase();
            const current = requiredSkillWeights.get(key);
            requiredSkillWeights.set(key, {
                name: current?.name || skill,
                weight: (current?.weight || 0) + weight
            });
        });
    });

    const profileSkills = asArray(profile.skills).length ? profile.skills : asArray(currentUser?.skills);
    const profileInterests = asArray(profile.interests).length ? profile.interests : asArray(currentUser?.interests);

    return {
        requiredSkillWeights,
        profile: { skills: profileSkills, interests: profileInterests },
        hasPostRequirements: requiredSkillWeights.size > 0,
        hasProfileSignals: profileSkills.length > 0 || profileInterests.length > 0
    };
}

export function getRecommendedStudents(students, posts, currentUser = {}) {
    const context = getRecommendationContext(posts, currentUser);
    return asArray(students)
        .filter((student) => student?.id && student.id !== currentUser?.id)
        .map((student) => {
            const score = context.hasPostRequirements || context.hasProfileSignals
                ? calculateRecommendationScore(student, context)
                : calculateMatchScore(currentUser, student);
            const matchedRequirements = [...context.requiredSkillWeights.values()]
                .filter((requirement) => asArray(student.skills).some((skill) => asText(skill).toLowerCase() === requirement.name.toLowerCase()))
                .map((requirement) => requirement.name);
            const matchedProfileSkills = asArray(context.profile.skills)
                .filter((skill) => asArray(student.skills).some((studentSkill) => asText(studentSkill).toLowerCase() === asText(skill).toLowerCase()));
            const reasonSkills = matchedRequirements.length ? matchedRequirements : matchedProfileSkills;

            return {
                ...student,
                matchPercentage: Math.min(100, Math.max(0, Math.round(score))),
                recommendationReason: reasonSkills.length
                    ? `Matches ${reasonSkills.slice(0, 2).join(" + ")}`
                    : "Matches your profile"
            };
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage || asText(a.name).localeCompare(asText(b.name)))
        .slice(0, 3);
}

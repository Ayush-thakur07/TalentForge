/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext(null);

function readStoredProfile(user) {
    const userKey = user?.uid || user?.id || user?.email;
    if (!userKey) return {};
    try {
        const storedProfile = localStorage.getItem(`talentforge_profile_${userKey}`);
        const profile = storedProfile ? JSON.parse(storedProfile) : {};
        return profile && typeof profile === "object" ? profile : {};
    } catch {
        return {};
    }
}

export function normalizeUser(user) {
    if (!user || typeof user !== "object") return null;
    const uid = user.uid || user.id || user.email;
    if (!uid) return null;

    const name = user.name || user.fullName || user.displayName || "";
    const avatar = user.avatar || user.profileImage || user.photoURL || "";
    return {
        ...user,
        uid,
        id: user.id || uid,
        name,
        fullName: user.fullName || name,
        avatar,
        profileImage: user.profileImage || avatar
    };
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const authenticatedUser = normalizeUser(firebaseUser);
                const storedProfile = readStoredProfile(authenticatedUser);
                const canonicalUser = normalizeUser({
                    ...authenticatedUser,
                    ...storedProfile,
                    uid: firebaseUser.uid,
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                });
                setCurrentUserState(canonicalUser);
            } else {
                setCurrentUserState(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const setCurrentUser = (user) => {
        if (!user) {
            setCurrentUserState(null);
            return;
        }
        const authenticatedUser = normalizeUser(user);
        const storedProfile = readStoredProfile(authenticatedUser);
        const canonicalUser = normalizeUser({
            ...authenticatedUser,
            ...storedProfile,
            uid: authenticatedUser.uid,
            id: authenticatedUser.id,
            email: authenticatedUser.email,
            displayName: authenticatedUser.displayName,
            photoURL: authenticatedUser.photoURL
        });
        setCurrentUserState(canonicalUser);
    };

    const updateCurrentUser = (changes) => {
        setCurrentUserState((previousUser) => {
            if (!previousUser) return null;
            const updatedUser = normalizeUser({ ...previousUser, ...changes });
            const userKey = updatedUser?.uid || updatedUser?.id || updatedUser?.email;
            if (userKey) {
                try {
                    localStorage.setItem(`talentforge_profile_${userKey}`, JSON.stringify(updatedUser));
                } catch (e) {
                    console.error("Failed to save profile changes:", e);
                }
            }
            return updatedUser;
        });
    };

    const value = useMemo(
        () => ({ currentUser, setCurrentUser, updateCurrentUser, loading }),
        [currentUser, loading]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}


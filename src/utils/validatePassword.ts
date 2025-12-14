// src/utils/validatePassword.ts
export type PasswordRules = {
    minLength?: number;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
};

const DEFAULT_RULES: Required<PasswordRules> = {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumber: true,
    requireSpecial: true,
};

const SPECIAL_CHARS_REGEX = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

export function validatePassword(
    value: string,
    rules: PasswordRules = DEFAULT_RULES
): true | string {
    const r = { ...DEFAULT_RULES, ...rules };

    if (value.length < r.minLength) return `Minimum ${r.minLength} characters`;
    if (r.requireLowercase && !/[a-z]/.test(value)) return "Must include at least 1 lowercase letter";
    if (r.requireUppercase && !/[A-Z]/.test(value)) return "Must include at least 1 uppercase letter";
    if (r.requireNumber && !/\d/.test(value)) return "Must include at least 1 number";
    if (r.requireSpecial && !SPECIAL_CHARS_REGEX.test(value))
        return "Must include at least 1 special character";

    return true;
}
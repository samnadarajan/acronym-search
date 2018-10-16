module.exports = {
    preset: "jest-preset-angular",
    roots: ['src'],
    setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.ts",
    moduleNameMapper: {
        "@config/(.*)": "<rootDir>/src/config/$1",
        "@app/(.*)": "<rootDir>/src/app/$1"
    }
}

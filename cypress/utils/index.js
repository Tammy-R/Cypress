//Random email function with @vivifyacademy.com closure

export const randomEmail = () => {
    return (
        Math.random()
        .toString(36)
        .substr(2, 7) + '@vivifyacademy.com'
    );
}
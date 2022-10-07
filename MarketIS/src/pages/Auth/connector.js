const connector = ({
    Main: {
        isLoading,
    },
    Auth: {
        error,
        email,
        password,
    },
}) => ({
    isLoading,
    error,
    email,
    password,
});

export default connector;
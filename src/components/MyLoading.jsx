
const MyLoading = ({isLoading, error}) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }

    return null;
};

export default MyLoading;

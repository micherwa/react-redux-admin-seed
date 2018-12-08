const getLocalItem = (key) => {
    const item = window.localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }

    return null;
};

const setLocalItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalItem = (key) => {
    window.localStorage.removeItem(key);
};

export default {
    getLocalItem,
    setLocalItem,
    removeLocalItem
};

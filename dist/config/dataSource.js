let dataSource;
export const setDataSource = (ds) => {
    dataSource = ds;
};
export const getDataSource = () => {
    if (!dataSource) {
        throw new Error("DataSource not initialized");
    }
    return dataSource;
};

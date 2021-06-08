import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConn = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions();

  let retry = 5;

  while (retry) {
    try {
      await createConnection({
        ...connectionOptions,
        name: 'default',
      });
      break;
    } catch (error) {
      console.log(error);
      retry -= 1;
      // Wait for 5 seconds before trying to connect again
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

export const closeTypeormConn = async (): Promise<void> => {
  await getConnection().close();
};

export const clearTypeormConn = async (): Promise<void> => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  await Promise.all(
    entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    })
  );
};

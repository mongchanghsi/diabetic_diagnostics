import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConn = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    name: 'default',
  });
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

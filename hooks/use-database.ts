import { getTypes, transformsTable } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useDatabase = (): { insert: (data: transformsTable) => Promise<any>; get: (data: getTypes) => Promise<any> } => {
  const TransformsTableKey = "Trans";

  // generate random key
  const randomDigits = () => {
    const part = () => Math.floor(1000 + Math.random() * 9000);
    return `${part()}-${part()}-${part()}`;
  };

  // insert function
  const insert = async ({
    id,
    content,
    type,
    amont,
    date,
    time,
  }: transformsTable) => {
    try {
      const payload = JSON.stringify({
        id,
        content,
        type,
        amont,
        date,
        time,
      });

      // FIX: call randomDigits()
      const key = TransformsTableKey + "-" + randomDigits();

      await AsyncStorage.setItem(key, payload);

      return {
        status: 200,
        message: "Action saved successfully",
        data: {
          key,
          payload: JSON.parse(payload),
        },
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Something went wrong",
        data: null,
        error,
      };
    }
  };

  const get = async ({ table }: getTypes) => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const keys = allKeys.filter((key) => key.includes(table));
      const results = await AsyncStorage.multiGet(keys);
      const parsedResults = results.map(([key, value]) => ({
        key,
        value: value ? JSON.parse(value) : null,
      }));

      return {
        status: 200,
        message: "Data stored successfully",
        data: parsedResults,
        error: null,
      };
    } catch (e) {
      return {
        status: 500,
        message: "Something went wrong",
        data: null,
        error: e,
      };
    }
  };

  return {
    insert,
    get,
  };
};

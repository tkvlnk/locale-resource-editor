import { unflatten } from 'flat';
import jsonStableStringify from 'json-stable-stringify';
import cloneDeep from 'lodash.clonedeep';

export type KeysByFileName = Record<string, Record<string, string>>;

export class LocaleEditorService {
  constructor(
    private readonly data: KeysByFileName = {},
    private readonly onDataUpdate: (nextData: KeysByFileName) => void,
    private readonly onRefresh: () => Promise<KeysByFileName>,
    private readonly onSaveData: (data: KeysByFileName) => Promise<void>
  ) {}

  get allUniqueKeys(): string[] {
    const allKeys = Object.values(this.data).flatMap((value) =>
      Object.keys(value)
    );

    return Array.from(new Set(allKeys).values());
  }

  get allFileNames(): string[] {
    return Object.keys(this.data);
  }

  getKeyInFile(fileName: string, key: string): string {
    return this.data[fileName]?.[key] ?? '';
  }

  setKeyInFile(fileName: string, key: string, value: string): void {
    const nextData = cloneDeep(this.data);

    if (!nextData[fileName]) {
      nextData[fileName] = {
        [key]: value
      };
    } else {
      nextData[fileName][key] = value;
    }

    this.onDataUpdate(nextData);
  }

  setAllData(nextData: KeysByFileName): void {
    this.onDataUpdate(cloneDeep(nextData));
  }

  getFormattedFileContents(fileName: string): string {
    return jsonStableStringify(unflatten(this.data[fileName]), {
      space: '  '
    });
  }

  async refreshData(): Promise<void> {
    const newData = await this.onRefresh();
    this.setAllData(newData);
  }

  async uploadData({
    isNestedStructure
  }: {
    isNestedStructure: boolean;
  }): Promise<void> {
    const data = isNestedStructure
      ? (Object.fromEntries(
          Object.entries(this.data).map(([key, value]) => [
            key,
            unflatten(value)
          ])
        ) as KeysByFileName)
      : this.data;

    await this.onSaveData(data);
  }
}

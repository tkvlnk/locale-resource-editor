import { unflatten } from 'flat';
import jsonStableStringify from 'json-stable-stringify';
import cloneDeep from 'lodash.clonedeep';

export type KeysByFileName = Record<string, Record<string, string>>;

export class LocaleEditorService {
  constructor(
    private readonly keysByFileName: KeysByFileName = {},
    private readonly onDataUpdate: (nextData: KeysByFileName) => void,
    private readonly onRefresh: () => Promise<KeysByFileName>,
    private readonly onSaveData: (data: KeysByFileName) => Promise<void>
  ) {}

  get allUniqueKeys(): string[] {
    const allKeys = Object.values(this.keysByFileName).flatMap((value) =>
      Object.keys(value)
    );

    return Array.from(new Set(allKeys).values());
  }

  get allFileNames(): string[] {
    return Object.keys(this.keysByFileName);
  }

  getKeyInFile(fileName: string, key: string): string {
    return this.keysByFileName[fileName]?.[key] ?? '';
  }

  setKeyInFile(fileName: string, key: string, value: string): void {
    const nextData = cloneDeep(this.keysByFileName);

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
    return jsonStableStringify(unflatten(this.keysByFileName[fileName]), {
      space: '  '
    });
  }

  async refreshData(): Promise<void> {
    const newData = await this.onRefresh();
    this.setAllData(newData);
  }

  async uploadData({
    shouldUnflatten
  }: {
    shouldUnflatten: boolean;
  }): Promise<void> {
    const data = shouldUnflatten
      ? (Object.fromEntries(
          Object.entries(this.keysByFileName).map(([key, value]) => [
            key,
            unflatten(value)
          ])
        ) as KeysByFileName)
      : this.keysByFileName;

    await this.onSaveData(data);
  }
}

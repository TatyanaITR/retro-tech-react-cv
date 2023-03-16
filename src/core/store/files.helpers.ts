import { Document, Folder, IRawData, ITree, Label } from "../api/files.types";

export const mergeAndSortObjects = (
  rawData: IRawData
): (Folder | Document | Label)[] => {
  const combinedItems = [
    ...(rawData.folders || []),
    ...(rawData.documents || []),
    ...(rawData.labels || []),
  ];

  return combinedItems.sort((a, b) =>
    (a.parent_id || "").localeCompare(b.parent_id || "")
  );
};

export function buildTree(
  items: (Folder | Document | Label)[],
  parentID: string | null
): ITree[] {
  const result: ITree[] = [];

  for (const item of items) {
    if (item.parent_id === parentID) {
      let children: ITree[] = [];

      if (item.type === "folder") {
        children = buildTree(items, item.id);
      }

      result.push({
        item: item,
        children: children,
      });
    }
  }
  return result;
}

export const findFolderById = (
  tree: ITree[],
  id: string
): ITree | undefined => {
  for (const node of tree) {
    if (node.item.type === "folder" && node.item.id === id) {
      return node as ITree;
    }

    const foundFolder = findFolderById(node.children, id);
    if (foundFolder) {
      return foundFolder;
    }
  }

  return undefined;
};

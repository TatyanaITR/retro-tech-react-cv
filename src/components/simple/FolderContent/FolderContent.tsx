import React, {useEffect} from "react";
import { InnerResourcesView } from "../../containers/InnerResourcesView/InnerResourcesView";
import {getFolder} from "../../../core/store/files";
import {RootState, useStoreDispatch} from "../../../core/store/store";
import {useSelector} from "react-redux";

export interface IFolderContent {
  id: string;
}
export const FolderContent: React.FC<IFolderContent> = ({ id }) => {
  const dispatch = useStoreDispatch();
  const currentFolder = useSelector(
      (state: RootState) => state.files.currentFolder
  );
  useEffect(() => {
    dispatch(getFolder(id));
  }, [id, dispatch]);

  return (
      <>
        <InnerResourcesView childNodes={currentFolder.children || []} />
      </>
  );
};



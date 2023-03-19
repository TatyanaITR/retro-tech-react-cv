import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState, useStoreDispatch} from "../../../core/store/store";
import {getDocument} from "../../../core/store/files";

export interface IDocumentContent {
  id: string;
}

export const DocumentContent: React.FC<IDocumentContent> = ({ id }) => {
    const dispatch = useStoreDispatch();
    const currentDoc = useSelector(
        (state: RootState) => state.files.currentDoc
    );
    useEffect(() => {
        dispatch(getDocument(id));
    }, [id, dispatch]);
  return (
    <>
        {currentDoc.id === id && currentDoc.content}
    </>
  );
};

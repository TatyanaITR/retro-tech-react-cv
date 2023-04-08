import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

type ParseContentProps = { content?: string | null };

export const ParseDocumentContent: React.FC<ParseContentProps> = ({ content }) => (
    <div>{content && parse(DOMPurify.sanitize(content))}</div>
);

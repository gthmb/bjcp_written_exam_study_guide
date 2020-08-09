import React from 'react';
import styled from 'styled-components';

export const Note = styled.span`
    color: orange;
`;

export const NoteContainer = styled.div`
    padding: 1em;
    border: 1px dashed orange;
    line-height: 1.3em;
`;

export const GravityRenderer: React.FunctionComponent<{ value: number | undefined }> = ({
    value,
}) => <span>{value !== undefined ? value.toFixed(3) : ''}</span>;

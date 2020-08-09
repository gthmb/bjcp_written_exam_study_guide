import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ opened: boolean }>`
    display: ${({ opened }) => (opened ? '' : 'none')};
`;

const Wrapper = styled.div`
    border: 1px dashed orange;
    padding: 1em;
    margin: 1em 0;
`;

const Title = styled.h4`
    cursor: pointer;
    margin-top: 0;
`;

const CollapsableContainer: React.FunctionComponent<{ title?: string; open?: boolean }> = ({
    title,
    open,
    children,
}) => {
    const [opened, setOpened] = React.useState(open || false);
    const handleClick = () => setOpened(!opened);

    return (
        <Wrapper>
            <Title onClick={handleClick}>
                {opened ? 'Hide ' : 'Show '}
                {title}
            </Title>
            <Container opened={opened}>{children}</Container>
        </Wrapper>
    );
};

CollapsableContainer.defaultProps = {
    open: true,
};

export default CollapsableContainer;

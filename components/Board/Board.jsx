import styled from 'styled-components';

export const Board = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 0;
    top: 0;
    width: 900px; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    border-radius: 8px;
    box-shadow: var(--shadow-smallest);
    background: #fff;
`;

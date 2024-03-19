import { ButtonContainer, LoadMoreButton } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonContainer>
      <LoadMoreButton type="button" onClick={onLoadMore}>
        Load more
      </LoadMoreButton>
    </ButtonContainer>
  );
};

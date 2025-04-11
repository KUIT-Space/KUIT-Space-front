import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().max(200, "제목은 200자를 초과할 수 없습니다."),
  content: z.string().max(1000, "내용은 1000자를 초과할 수 없습니다."),
});

type PostFormData = z.infer<typeof postSchema>;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  font-family: "Freesentation R";
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2em;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.BG400};
  }

  &:focus {
    outline: none;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.BG800};
  margin: 0;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  font-family: "Freesentation R";
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4em;
  letter-spacing: 0.04em;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  resize: none;
  min-height: 200px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.BG400};
  }

  &:focus {
    outline: none;
  }
`;

export default function PostComposer() {
  const {
    register,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
  });

  return (
    <PostContainer>
      <TitleInput placeholder="제목을 입력해주세요." {...register("title")} />
      <Divider />
      <ContentTextarea placeholder="내용을 입력해주세요." {...register("content")} />
    </PostContainer>
  );
}

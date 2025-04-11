import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";

const STORAGE_KEY = "post-draft";
const DEBOUNCE_DELAY = 500;

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
  height: 100vh;
  padding: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CharCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-family: "Freesentation R";
  font-size: 12px;
  color: ${({ theme }) => theme.colors.BG400};
`;

const ErrorMessage = styled.span`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-family: "Freesentation R";
  font-size: 12px;
  color: ${({ theme }) => theme.colors.char_red};
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

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  font-family: "Freesentation R";
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4em;
  letter-spacing: 0.04em;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.BG400};
  }

  &:focus {
    outline: none;
  }
`;

// debounce 유틸리티 함수
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function PostComposer() {
  const loadSavedData = (): PostFormData => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { title: "", content: "" };
      }
    }
    return { title: "", content: "" };
  };

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: loadSavedData(),
  });

  const watchTitle = watch("title");
  const watchContent = watch("content");

  // debounce 함수를 useRef로 메모이제이션
  const debouncedSave = useRef(
    debounce((data: PostFormData) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, DEBOUNCE_DELAY),
  ).current;

  // useCallback에서 debouncedSave를 사용
  const saveData = useCallback(
    (data: PostFormData) => {
      debouncedSave(data);
    },
    [debouncedSave],
  );

  useEffect(() => {
    saveData({ title: watchTitle, content: watchContent });
  }, [watchTitle, watchContent, saveData]);

  return (
    <PostContainer>
      <InputWrapper>
        <TitleInput placeholder="제목을 입력해주세요." {...register("title")} />
        <CharCount>{watchTitle?.length ?? 0}/200</CharCount>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </InputWrapper>
      <Divider />
      <ContentWrapper>
        <ContentTextarea placeholder="내용을 입력해주세요." {...register("content")} />
        <CharCount>{watchContent?.length ?? 0}/1000</CharCount>
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      </ContentWrapper>
    </PostContainer>
  );
}

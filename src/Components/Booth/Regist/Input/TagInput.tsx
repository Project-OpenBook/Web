import { FaHashtag } from "react-icons/fa";
import { useRef } from "react";

interface Props {
  placeholder: string;
  tagNames: string[];
  setTagNames: (tag: string[]) => void;
  addTags?: string[];
  delTags?: string[];
  setAddTags?: (tag: string[]) => void;
  setDelTags?: (tag: string[]) => void;
}

export default function TagInput({
  placeholder,
  setTagNames,
  tagNames,
  setAddTags,
  setDelTags,
  addTags,
  delTags,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      const newTag = inputRef.current.value;
      if (validateTag(newTag)) {
        setTagNames([...tagNames, newTag]);
        inputRef.current.value = "";
      }
      if (setAddTags && addTags) {
        const newAddTag = [...addTags, newTag];
        setAddTags(newAddTag);
      }
    }
  };

  const validateTag = (tag: string) => {
    if (tag === "") {
      window.alert("빈 태그는 등록할 수 없습니다!");
      return false;
    }
    if (tag.length > 15) {
      window.alert("태그는 15자 까지 작성할 수 있습니다!");
      return false;
    }
    if (/\s/.test(tag)) {
      window.alert("태그에는 띄어쓰기가 들어갈 수 없습니다!");
      return false;
    }
    if (tagNames.length >= 5) {
      window.alert("태그는 최대 5개까지 등록할 수 있습니다!");
      return false;
    }

    return true;
  };

  const handleRemove = (index: number, tag: string) => {
    const newTagNames = [...tagNames];
    newTagNames.splice(index, 1);
    setTagNames(newTagNames);

    if (setDelTags && delTags) {
      const delTagNames = [...delTags, tag];
      setDelTags(delTagNames);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-screen-sm mb-5">
      <div className="flex gap-2 items-center h-full mb-2">
        <FaHashtag size={25} color="#0064FF" />
        <label className="font-bold">부스 태그</label>
      </div>
      <div className="flex items-center w-full gap-2">
        <input
          ref={inputRef}
          placeholder={placeholder}
          type="text"
          className="h-10 border-b-2 pl-1 w-3/4"
        />
        <button
          onClick={handleSubmit}
          className="h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
        >
          확인
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mt-2 text-white">
        {tagNames.map((tag, index) => (
          <div key={index} className="bg-blue-400 px-2 py-1 rounded-md">
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(index, tag);
              }}
              className="ml-2 text-black"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

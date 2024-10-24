import { FaHashtag } from "react-icons/fa";
import { useRef } from "react";

interface Props {
  placeholder: string;
  tagNames: string[];
  setTagNames: (tags: string[]) => void;
  tags?: Tag[];
  setTags?: (tags: Tag[]) => void;
  addTags?: string[];
  delTags?: string[];
  setAddTags?: (tags: string[]) => void;
  setDelTags?: (tags: string[]) => void;
}

interface Tag {
  id: string;
  name: string;
}

export default function TagInput({
  placeholder,
  setTagNames,
  tagNames,
  setAddTags,
  setDelTags,
  addTags,
  delTags,
  setTags,
  tags,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(addTags, delTags);

  const handleRemove = (index: number, tagName: string) => {
    const newTagNames = [...tagNames];
    newTagNames.splice(index, 1);
    setTagNames(newTagNames);
    if (tags && setTags) {
      const tagToDelete = tags.find((tag) => tag.name === tagName);
      if (tagToDelete && setDelTags && delTags) {
        const delTagIds = [...delTags, tagToDelete.id];
        setDelTags(delTagIds);
      }
    }

    if (setAddTags && addTags) {
      const updatedAddTags = addTags.filter((tag) => tag !== tagName);
      setAddTags(updatedAddTags);
    }
    if (tags && setTags) {
      const updatedTags = tags.filter((tag) => tag.name !== tagName);
      setTags(updatedTags);
    }
  };

  const handleSubmit = () => {
    if (inputRef.current) {
      const newTag = inputRef.current.value;

      // 중복 검사 후 태그 추가
      if (validateTag(newTag)) {
        setTagNames([...tagNames, newTag]);
        inputRef.current.value = "";

        if (setAddTags && addTags) {
          const newAddTags = [...addTags, newTag];
          setAddTags(newAddTags);
        }
      }
    }
  };

  const validateTag = (tag: string) => {
    if (tag === "") {
      window.alert("빈 태그는 등록할 수 없습니다!");
      return false;
    }
    if (tag.length > 15) {
      window.alert("태그는 15자까지 작성할 수 있습니다!");
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
    if (tagNames.includes(tag)) {
      window.alert("이미 존재하는 태그입니다!");
      return false;
    }
    return true;
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

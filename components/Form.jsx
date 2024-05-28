import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Quill from "quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

function Form({ type, post, setPost, submitting, handleSubmit, errors }) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const handleEditorChange = (content, delta, source, editor) => {
    const plainText = editor.getText(content);
    setPost({
      ...post,
      htmltopic: content,
      topic: plainText,
    });
  };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing topics with the world, and let your imagination
        run wild.
      </p>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-2xl mt-10 flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Topic
          </span>
          <input
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
            placeholder='Title'
            maxLength={40}
            className='form_input'
          ></input>
          <span className='text-red-600 italic text-xs'>
            {errors.titleContent && errors.titleError}
          </span>
        </label>
        <ReactQuill
          theme='snow'
          value={post.htmltopic}
          className='bg-white rounded-md'
          placeholder='Write your topic...'
          modules={quillModules}
          onChange={handleEditorChange}
          required
        />
        <span className='text-red-600 italic text-xs'>
          {errors.topicContent && errors.topicError}
        </span>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag{` `}
            <span className='font-normal'>
              (#product, #webdevelopement, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder='#tag'
            maxLength={50}
            className='form_input'
          ></input>
          <span className='text-red-600 italic text-xs'>
            {errors.tagContent && errors.tagError}
          </span>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Color Theme{" "}
            <span className='font-normal'>
              (Add a little color to your topic...)
            </span>
          </span>
          <div className='flex justify-center flex-wrap gap-10 mt-8 mb-4'>
            <Image
              src='/assets/images/backgrounds/bg1.svg'
              data-value='bg1'
              alt='Theme 1'
              width={165}
              height={150}
              className={`hover_effect ${
                "bg1" === post.theme
                  ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                  : ""
              }`}
              onClick={(e) =>
                setPost({ ...post, theme: e.currentTarget.dataset.value })
              }
            />
            <Image
              src='/assets/images/backgrounds/bg2.svg'
              data-value='bg2'
              alt='Theme 2'
              width={165}
              height={150}
              className={`hover_effect ${
                "bg2" === post.theme
                  ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                  : ""
              }`}
              onClick={(e) =>
                setPost({ ...post, theme: e.currentTarget.dataset.value })
              }
            />
            <Image
              src='/assets/images/backgrounds/bg3.svg'
              data-value='bg3'
              alt='Theme 3'
              width={165}
              height={150}
              className={`hover_effect ${
                "bg3" === post.theme
                  ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                  : ""
              }`}
              onClick={(e) =>
                setPost({ ...post, theme: e.currentTarget.dataset.value })
              }
            />
            <Image
              src='/assets/images/backgrounds/bg4.svg'
              data-value='bg4'
              alt='Theme 4'
              width={165}
              height={150}
              className={`hover_effect ${
                "bg4" === post.theme
                  ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                  : ""
              }`}
              onClick={(e) =>
                setPost({ ...post, theme: e.currentTarget.dataset.value })
              }
            />
            <Image
              src='/assets/images/backgrounds/bg5.svg'
              data-value='bg5'
              alt='Theme 5'
              width={165}
              height={150}
              className={`hover_effect ${
                "bg5" === post.theme
                  ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                  : ""
              }`}
              onClick={(e) =>
                setPost({ ...post, theme: e.currentTarget.dataset.value })
              }
            />
          </div>
          <span className='text-red-600 italic text-xs'>
            {errors.themeSelected && errors.themeError}
          </span>
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 bg-primary-orange text-white rounded-lg'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;

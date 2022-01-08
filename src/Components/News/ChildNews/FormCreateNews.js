import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { postNews } from "../../../Services/news-services";
import { useNavigate } from "react-router-dom";

const FormCreateNewsComponent = () => {
  const [contentEditor, setContentEditor] = useState();
  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    setContentEditor(content);
  };

  const onSubmit = (data) => {
    console.log(contentEditor.level.content);
    let newImage = data.image[0];
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("mitra_id", 1);
    formData.append("content", contentEditor.level.content);
    formData.append("image", newImage);

    postNews(formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Success create News");
          navigate("/news");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Username or Email is already exists");
        }
      });
  };

  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden w-auto">
          <div className="px-4 py-5 bg-white w-full">
            <div className="grid grid-cols-3 gap-6"></div>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Title News
              </label>
              <div className="mt-1">
                <input
                  id="about"
                  name="about"
                  {...register("title")}
                  className="shadow-sm h-10 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mt-5 mb-2"
            >
              Content
            </label>
            <Editor
              apiKey="8ar60hd0c0n7rookdk5otkivkiazw5rycitk5d9a2n9vcyjs"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p></p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onChange={handleEditorChange}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
                Image News
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {preview === null ? (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <img src={preview} alt="" className="w-24 h-20" />
                    </>
                  )}

                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        {...register("image")}
                        onChange={onSelectFile}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateNewsComponent;

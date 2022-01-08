import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getNewsDetails, updateNews } from "../../../Services/news-services";

const FormEditNewsComponent = () => {
  const navigate = useNavigate();
  const [contentEditor, setContentEditor] = useState();
  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState();
  const [news, setNews] = useState([]);
  const location = useLocation();
  const newsId = location.state.newsId;
  console.log("news id", newsId);

  React.useEffect(() => {
    const getDetailNews = () => {
      getNewsDetails(newsId)
        .then((data) => {
          setNews(data.data.data);
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    };
    getDetailNews();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const editorRef = useRef(null);
  const onSubmit = (data) => {
    let newImage = data.image[0];
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("mitra_id", 1);
    formData.append("content", contentEditor.level.content);
    formData.append("image", newImage);

    updateNews(newsId, formData)
      .then((data) => {
        if (data.data.status === 200) {
          alert("Berhasil Update News");
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

  const handleEditorChange = (content) => {
    setContentEditor(content);
  };

  console.log("data news", news);
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
                  defaultValue={news.title}
                  {...register("title")}
                  className="shadow-sm h-10 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
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
              initialValue={news.content}
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
                      <img src={news.image} className="w-80 h-60" alt="" />
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

export default FormEditNewsComponent;

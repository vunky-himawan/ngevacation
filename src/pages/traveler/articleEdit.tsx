import { useGetArticle } from "@/hooks/article/useGetArticle";
import { useParams } from "react-router-dom";
import WriteArticle from "./WriteArticle";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import Loading from "@/components/Skeleton";
import { useAuth } from "@/context/AuthContext";

const ArticleEdit = () => {
  const { token } = useAuth();
  const { articleId } = useParams<{ articleId: string }>();
  const [data, setData] = useState<Article | null>(null);
  const getArticle = useGetArticle();

  useEffect(() => {
    getArticle(
      (data: Article) => {
        setData(data);
      },
      () => {
        console.log("error");
      },
      articleId as string,
      token as string
    );
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <WriteArticle
        articleId={articleId}
        isEdit={true}
        dataContent={data?.content}
        dataTitle={data?.title}
        dataCover={data?.cover}
        dataTags={data?.tag}
      />
    </>
  );
};

export default ArticleEdit;

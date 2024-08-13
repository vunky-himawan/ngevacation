import { useGetArticle } from "@/hooks/article/useGetArticle";
import { useParams } from "react-router-dom";
import WriteArticle from "./WriteArticle";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import Loading from "@/components/Skeleton";

const ArticleEdit = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [data, setData] = useState<Article | null>(null);

  const fetchedData = useGetArticle({
    articleId: articleId as string,
    withInterval: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

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

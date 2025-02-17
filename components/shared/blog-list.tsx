import { BlogPostForList } from '@/actions/blog';
import { BlogCard } from './blog-card';
import { LocaleType } from '@/i18n/settings';

type BlogListProps = {
  blogList: Array<BlogPostForList>;
  currentLocale: LocaleType;
};
export function BlogCardList(props: BlogListProps) {
  const { blogList, currentLocale } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogList?.map((post) => <BlogCard locale={currentLocale} key={post.slug} blog={{ ...post }} />)}
    </div>
  );
}

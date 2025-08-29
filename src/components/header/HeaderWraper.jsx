import { getDictionary } from "../../lib/transilation";
import Header from "./Header";

export default async function HeaderWraper({ locale }) {
  const { navbar } = await getDictionary(locale);
  return <Header locale={locale} transilation={navbar} />;
}

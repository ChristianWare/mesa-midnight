import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    // <PagePlaceholder {...guides.home}></PagePlaceholder>
    <main>
      <h1>
        Human touch <br />
        + AI for Visionary
        <br />
        Digital Studio
      </h1>
      <br />
      <br />
      <br />
      <h2>Heading 2</h2>
      <br />
      <br />
      <br />
      <h3>Heading 3</h3>
      <br />
      <br />
      <br />
      <h4>Heading 4</h4>
      <br />
      <br />
      <br />
      <h5>Heading 5</h5>
      <br />
      <br />
      <br />
      <h6>Heading 6</h6>
      <br />
      <br />
      <br />
      <p>
        Regular paragrapgh:
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit odit
        eveniet eligendi exercitationem dolor, quia rerum dolore obcaecati saepe
        placeat recusandae veritatis architecto eos dicta voluptas quibusdam
        sint vero magnam.
      </p>
      <br />
      <br />
      <br />
      <p className='mediumParagrapgh'>
        Regular paragrapgh:
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit odit
        eveniet eligendi exercitationem dolor, quia rerum dolore obcaecati saepe
        placeat recusandae veritatis architecto eos dicta voluptas quibusdam
        sint vero magnam.
      </p>
    </main>
  );
}

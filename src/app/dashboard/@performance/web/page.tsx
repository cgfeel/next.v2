import ButtonToPost from "../../components/ButtonToPost";
import RebackLink from "../../components/RebackLink";

export default function Home() {
    return (
      <>
        <h2>dashboard web page</h2>
        <p>
          <RebackLink />
        </p>
        <p>
          <ButtonToPost 
            pid={6} 
            prefetch={false} 
          />
        </p>
      </>
    )
  }
  
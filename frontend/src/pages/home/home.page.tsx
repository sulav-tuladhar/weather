import ContentComponent from "../../components/content/content.component"
import SearchComponent from "../../components/search/search.component"

function HomePage() {
  return (
    <section className="h-[100vh] w-[100%] flex flex-col items-center justify-center">
      <SearchComponent />
      <ContentComponent />
    </section>
  )
}

export default HomePage

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'test-automation-dev/test-automation.dev',
        repoId: 'R_kgDOJnD70Q',
        category: 'Announcements',
        categoryId: 'DIC_kwDOJnD70c4CW19M',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      Source: "https://github.com/test-automation-dev/test-automation.dev",
      Impressum: "/Impressum",
      "Privacy Policy": "/Privacy-Policy"

    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(
      {
        title: "Content",
        filterFn: (node) => {
          // exclude files with the tag "explorerexclude"
          return node.file?.frontmatter?.tags?.includes("explorerexclude") !== true
        },
        folderClickBehavior: "link"
      }
    )),
  ],
  right: [
    // Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

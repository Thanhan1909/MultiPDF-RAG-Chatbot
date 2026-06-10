def build_sources(docs):

    sources = []

    for d in docs:

        sources.append({
            "title":
            d.metadata.get(
                "source",
                "Unknown"
            ).split("/")[-1].split("\\")[-1],

            "page":
            d.metadata.get(
                "page",
                "?"
            ),

            "source":
            d.metadata.get(
                "source",
                ""
            )
        })

    return sources
module.exports = function (
  { afterBuild, store, _app: { graphql } },
  {collections, chunkSize = 1000, enablePartialUpdates = false }
) {
  /**
   * give back the same thing as this was called with.
   *
   * @param {any} item what to keep the same
   */
  const defaultTransformer = (item) => {
    return {
      objectID: item.id,
      title: item.title,
      slug: item.slug,
      modified: item.modified,
    };
  }

  // const indexState = {}

  afterBuild(async () => {

    const started = Date.now()

    // const client = algoliasearch(appId, apiKey);

    // const jobs = collections.map(async (
    //   { indexName, itemFormatter = defaultTransformer, contentTypeName, query, transformer, matchFields = ['modified'] },
    //   cIndex
    // ) => {
    //   if (contentTypeName) throw new Error(`"contentTypeName" is no longer supported (Since version 2.x). Please update your code and remove "contentTypeName"`);
    //   if (!query || !transformer) throw new Error(`Algolia failed collection #${cIndex}: "query" and "transformer" required`);

    //   if (!Array.isArray(matchFields) || !matchFields.length) throw new Error(`Algolia failed ${cIndex}: matchFields required array of strings`);

    //   /* Use to keep track of what to remove afterwards */
    //   if (!indexState[indexName]) indexState[indexName] = {
    //     index: client.initIndex(indexName),
    //     toRemove: {}
    //   }
    //   const currentIndexState = indexState[indexName];

    //   const { index } = currentIndexState;
    //   /* Use temp index if main index already exists */
    //   let useTempIndex = false
    //   const indexToUse = await (async (_index) => {
    //     if (!enablePartialUpdates) {
    //       if (useTempIndex = await indexExists(_index)) {
    //         const tmpIndex = client.initIndex(`${indexName}_tmp`);
    //         await scopedCopyIndex(client, _index, tmpIndex);
    //         return tmpIndex;
    //       }
    //     }
    //     return _index
    //   })(index)

    //   console.log(`Algolia collection #${cIndex}: Executing query`);

    //   const result = await graphql(query);
    //   if (result.errors) {
    //     report.panic(`failed to index to Algolia`, result.errors);
    //   }

    //   const items = transformer(result).map(itemFormatter || ((item) => {
    //     item.objectID = item.objectID || item.id
    //     return item
    //   }))

    //   if (items.length > 0 && !items[0].objectID) {
    //     throw new Error(`Algolia failed collection #${cIndex}. Query results do not have 'objectID' key`);
    //   }

    //   console.log(`Algolia collection #${cIndex}: items in collection ${Object.keys(items).length}`);

    //   let hasChanged = items;
    //   if (enablePartialUpdates) {
    //     console.log(`Algolia collection #${cIndex}: starting Partial updates`);

    //     const algoliaItems = await fetchAlgoliaObjects(indexToUse, matchFields);

    //     const results = algoliaItems ? Object.keys(algoliaItems).length : 0
    //     console.log(`Algolia collection #${cIndex}: found ${results} existing items`);

    //     if (results) {
    //       hasChanged = items.filter(curObj => {
    //         const {objectID} = curObj
    //         let extObj = algoliaItems[objectID]

    //         /* The object exists so we don't need to remove it from Algolia */
    //         delete(algoliaItems[objectID]);
    //         delete(currentIndexState.toRemove[objectID])

    //         if (!extObj) return true;

    //         return !!matchFields.find(field => extObj[field] !== curObj[field]);
    //       });

    //       Object.keys(algoliaItems).forEach((objectID) => currentIndexState.toRemove[objectID] = true)
    //     }

    //     console.log(`Algolia collection #${cIndex}: Partial updates – [insert/update: ${hasChanged.length}, total: ${items.length}]`);
    //   }

    //   const chunks = chunk(hasChanged, chunkSize);

    //   console.log(`Algolia collection #${cIndex}: splitting in ${chunks.length} jobs`);

    //   /* Add changed / new items */
    //   const chunkJobs = chunks.map(async function(chunked) {
    //     const { taskID } = await indexToUse.addObjects(chunked);
    //     return indexToUse.waitTask(taskID);
    //   });

    //   await Promise.all(chunkJobs);

    //   if (useTempIndex) {
    //     console.log(`Algolia collection #${cIndex}: moving copied index to main index`);
    //     return moveIndex(client, indexToUse, index);
    //   }
    // });

    // try {
    //   await Promise.all(jobs)
    //   if (enablePartialUpdates) {
    //     /* Execute once per index */
    //     /* This allows multiple queries to overlap */
    //     const cleanup = Object.keys(indexState).map(async function(indexName) {
    //       const state = indexState[indexName];
    //       const isRemoved = Object.keys(state.toRemove);

    //       if (isRemoved.length) {
    //         console.log(`Algolia: deleting ${isRemoved.length} items from ${indexName} index`);
    //         const { taskID } = await state.index.deleteObjects(isRemoved);
    //         return state.index.waitTask(taskID);
    //       }
    //     })

    //     await Promise.all(cleanup);
    //   }
    // } catch (err) {
    //   throw new Error(`Algolia failed: ${err.message}`);
    // }

    console.log(`Finished indexing to ElasticSearch in ${Date.now() - started}ms`);
  })
}
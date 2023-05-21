const uploadArticle = async ({ res, getWriteClient, article }) => {
  try {
    const formattedArticle = {
      _type: 'restaurant',
      name: 'New restaurant ✨',
      article,
    };

    console.log('Formttedarticle', formattedArticle);
    console.log('Formatted article title', formattedArticle.article.title);

    let message = 'Restaurant submitted';
    const query = '*[_type == "restaurant" && article.title == $articleTitle] {name, "article": article.title}';
    const params = { articleTitle: formattedArticle.article.title };

    const restaurants = await getWriteClient().fetch(query, params).then((restos) => restos);

    // console.log('Query response:', restaurants);
    if (restaurants.length === 0) {
      await getWriteClient().create(formattedArticle).then((resp) => resp);
      message = 'Restaurant was created';
    } else {
      message = 'That restaurant already exists';
    }
    res.status(200).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Couldn\'t create restaurant(s)', err });
  }
};

export default uploadArticle;

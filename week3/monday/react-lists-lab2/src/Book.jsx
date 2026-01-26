const Book = (props) => {
  const { img, title, author, genre, year } = props.book;

  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <h4>{author}</h4>
      <p>{genre}</p>
      <p>{year}</p>
    </article>
  );
};

export default Book;
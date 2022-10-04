import ContainerBody from '../category-body/category-body.component';

import './category-item.styles.scss'


const CategoryItem = ({ category, key }) => {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <ContainerBody id={key} title={title} message="SHOP NOW" />
    </div>
  )
}

export default CategoryItem
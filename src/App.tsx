import * as React from 'react';
import {
  Link,
} from "react-router-dom";
import { Wrapper } from './components/Quiz/Quiz.styles';

interface Category  {
    id: number;
    name: string;
    slug: string
}

const App = () => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [categories, setCategories] = React.useState<Category[]>([])

    const fetchCategories = async ()=> {
        const result = await fetch(`http://127.0.0.1:8000/category/`);
        const data = await result.json();
        setCategories(data);
    }

    React.useEffect(()=> {
        fetchCategories();
        setLoading(false);
    },[])

    if (loading) {
        return (
          <div className="container text-center">
            <p>Loading categories</p>
          </div>)
    }
    return (
      <Wrapper className="Landing">
        <div className="container">
          <h3 className="mt-5 mb-5 text-center" style={{color: "white"}}>
              <strong>Categories</strong>
          </h3>
          <div className="row mb-2">
          {categories?.map(({id, name, slug}) => (
            <Link to={`${slug}`}>
              <h3 className="feature-title">
                <div className="col-12 text-center align-items-center">
                  <div className="btn-group"> 
                    <a type="button" href={`${slug}`} className="btn btn-info btn-lg btn-block" style={{width:650}}>
                      <span>{name}</span>
                    </a>
                  </div>
                </div>
              </h3>
            </Link>
          ))}
          </div>
        </div>
      </Wrapper>
    )
}

export default App;
# How to Implement Modal using React Router v6

Hello! I've been searching how to implement Modal in React Router v6, but unfortunately, the results that I found didn't match my needs. The tutorial blogs that I came accorss were using `JSX Routes` and I'm using `createBrowserRouter` to manage my history stack. After some searching and trying to make it work, I finally got it to work. 🙃

![react-router-modal-sample-v5](https://res.cloudinary.com/dprke9xka/image/upload/v1706374005/modal-react-router-v5_ptxwjl.gif)

If you want to achieve the sample GIF above but in React V6 and you're using `createBrowserRouter`, then this tutorial is for you ✨


Here's how I did it. 😄

![react-router-modal-sample](https://res.cloudinary.com/dprke9xka/image/upload/v1706358207/react-router-modal-sample-yey6bj.gif)

The tutorial below will be just focusing on implementing modal it doesn't have navbar like in the image above. 


### START
First things first, You need to create react app and install the `react-router-dom` and run `npm install` to start.

Let's start with the folder structure. Simply copy the layout of my files and folders provided below:
```
/src
  /components
   Modal.js
  /data
   dummy-data.js
  /pages
   Gallery.jsx
  App.jsx
```

##dummy-data.js
```
export const images = [
  {
    id: 1,
    thumbnail:
      'https://images.unsplash.com/photo-1682685797886-79020b7462a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
    fullSize:
      'https://images.unsplash.com/photo-1682685797886-79020b7462a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    details: 'Details about Image 1',
  },
  {
    id: 2,
    fullSize:
      'https://images.unsplash.com/photo-1706028024882-0b972506d02d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    thumbnail:
      'https://images.unsplash.com/photo-1706028024882-0b972506d02d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
    details: 'Details about Image 2',
  },
];

```
`dummy-data.js `contains a array object that will be use as our dummy data. The `id` will be a unique identifier for our image it will be use later to get the image details.

##Modal.jsx
```
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { images } from '../data/dummy-data';

const Modal = () => {
  const { id: imageId } = useParams();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const image = images.find(({ id }) => imageId == id);

    setImageData(image);
  }, [imageId]);

  const handleOnClose = () => {
    navigate('/');
  };

  return (
    <>
      {imageData && (
        <div className="modal">
          <div className="modal-content">
            <img src={imageData.fullSize} alt="Full Size" />
            <p>{imageData.details}</p>
            <button onClick={handleOnClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
```
`Modal.jsx` is a functional component will be used to as our pop up modal for viewing details of specific image. 

#### Variable Declarations:
`imageId`: extracts the id from the route using `useParams()` This is the unique identifier for the image being displayed in the modal. 

`navigate` Provides a function to navigate between pages using useNavigate().

#### State Management:
`imageData` represents the state for holding information about the selected image. 

`useEffect` is used to fetch the details of the image when the component mounts or when the `imageId` changes. It finds the corresponsing image in the `images` array object (imported from the dummy-data).

#### Close Modal Function:
`handleOnClose` defines a function to clode the modal by navigating back to the root path ('/) using the `navigate `function.

#### Render Modal:
The component renders a modal only if `imageData` is truthy (i.e., an image is found). Inside the modal, it displays the full-size image, additional details, and close button.


## Gallery.jsx
```
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/dummy-data';
import Modal from '../components/Modal';

const Gallery = () => {
  const navigate = useNavigate();

  const viewImage = (image) => {
    const id = image.id;
    navigate('/view/' + id);
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <button
          key={image.id}
          className="gallery-item"
          onClick={() => viewImage(image)}
        >
          <img src={image.thumbnail} alt={`Thumbnail ${index + 1}`} />
        </button>
      ))}

      <Modal />
    </div>
  );
};

export default Gallery;

```
`Gallery.jsx` is responsible for rendering a gallery of images with thumbnail previews. Inside the component, it maps over the images array object from dummy data. Each button has a click event handler `(onClick)` that calls the viewImage function with the corresponding image.

The `viewImage` function takes an image object parameter based on the thumbnail click, and it extracts the id property from the image object. It then navigates to the route view/:id.

The `Modal` component is rendered at the end of the `Gallery` component. It is included to provide the modal functionality for viewing detailed information about a selected image.

## App.jsx

```
import React from 'react';
import Gallery from './pages/gallery';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Gallery />,
    children: [
      {
        path: 'view/:id',
        element: null,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

```

`createBrowserRouter` is the recommended router for all React Router web projects. It uses DOM History API to update the URL and manage the history stack.

The main router for the code above is specified with `path: '/'` and is set to render the `Gallery`component. 

Additionally, there's a child route defines with `path: 'view/:id'` but the `element` associated with it is set to `null`. 

The `RouterProvider` component is used to provide the router instance (`router`) to the entire React component tree. This is crucial for enabling the routing functionality.


![react-router-modal-sample](https://res.cloudinary.com/dprke9xka/image/upload/v1706373608/sample-2_a9lh9e.gif)

### End of Code.
---

### Explanation Summary:

We have an index parent route and it has children route `view/:id` that renders null element. If we navigate to this routes, the parent element will retain its current position. The reason for this is that we don't have an `<Outlet />` to render the children of the parent route. So, it will just stay at the location where we trigger the navigation. The reason why the Modal is showing because we have a`useEffect` that triggers when the `gallery/:id` changes. It will only trigger if we click the thumbnails that triggers to update the URL. 


That's all! I hope this was helpful. If you have any questions, feel free to ask. Thanks for reading!

[LIVE DEMO](https://65b52f718360bb0008923d06--exquisite-fairy-28b3d3.netlify.app/)
[Source Code With Navbar](https://github.com/roselletabuena/react-router-modal)
[Source Code Modal Only](https://github.com/roselletabuena/react-router-modal/tree/modal-only)

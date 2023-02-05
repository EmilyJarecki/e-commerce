# E-Commerce 
### Stack: MongoDB, Express, React, Node

## Project Summary
The plan is to build a full-stack e-commerce site designated for individuals trying to grow their own brand or sell their own products. It will have a space designated for their social media posts so that the site is more user-relatable and less corporate-feely. 

## User Stories
As a user, when I click onto the seller's link I am greeted by an image of a product. 
There is an option to shop now which will take me to view all products organized in a grid. 
However, I also have the option to scroll down the homepage where there are images of different categories of products. When I click on the category, I am taken to the product list page but it is filtered with items particular to that category. 
The product-list page shows the images, name, and price of each item. 
When I click on the individual product, I am able to view the name, price, and description. 
I am also able to click "add to cart." 
When I click on the cart, I see all the items which I have clicked on. I see the image, product name, price, and quantity. I can adjust the quantity or click "checkout" which directs me to a page asking for my credit card number and personal information. 
Once I enter it, a message appears which says my purchase was successful and I am redirected to the home page. 
The cart is empty once again.

## User Flow

![](https://user-images.githubusercontent.com/107048020/215298685-e18df507-a4d0-4729-b76b-381e5475798d.png)

## Wireframes
![](https://user-images.githubusercontent.com/107048020/215240464-d0a195c4-e1c3-4ccc-b279-44748e7f7917.png)

Product List
![](https://user-images.githubusercontent.com/107048020/215240454-1d69a106-67ab-43ea-b18f-2a74790d10e2.png)

Product Detail
![](https://user-images.githubusercontent.com/107048020/215240461-0310736e-33b8-44c9-8202-2cafd3db8d58.png)


## Data Models
<img width="726" alt="Screen Shot 2023-01-30 at 11 10 01 AM" src="https://user-images.githubusercontent.com/107048020/215546035-8eab931c-5045-4a8a-86c5-837b3304806a.png">

## Routes for backend:
Product: 
- Show Route (show entire list of products)
- Index Route (show single product)

## Feature List
Essential features for MVP:
- Users can view a list of products
- Ability to add to cart multiple items, view those items, update quantity and delete (CRUD)

Important but not essential:
- Credit Card Payments
- Search Bar
- Instagram post
- Nav Bar

Features for later iteration:
- Adding hearts/wish list
- Creating a Profile/User Auth
- Having products into categories.

## Milestones
Day 1: Set up routes for 4 pages. Include product information. Determine how to store product information- static data, MongoDB, or in Stripe product page?  
Day 2: Tackle cart functionality. Set up database with product information.
Day 3: Products to cart relationship. 
Day 4: Product category. Nav bar. Search bar. In that order.
Day 5: Have cart list connected with Stripe API. Deploy.
Day 6-7: Style using a little with bootstrap template. A place for social media posts by that company. 
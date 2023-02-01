import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  questions = [
    {
      title: 'How do I search for recipes on the website?',
      answer: 'You can search for recipes on the website by using the search bar located at the top of the page. Simply enter a keyword or ingredient and hit the search button to see the results.',
    },
    {
      title: 'Can I save my favorite recipes on the website?',
      answer: 'Yes, you can save your favorite recipes on the website by clicking the "Save" button located on each recipe page. Your saved recipes will be stored in your account for easy access later.',
    },
    {
      title: 'How do I add my own recipe to the website?',
      answer: 'You can add your own recipe to the website by clicking the "Add Recipe" button located in the main navigation. Fill out the form with the recipe details, including ingredients, instructions, and a photo, then hit the "Submit" button to have it added to the website.',
    },
    {
      title: 'Can I print a recipe from the website?',
      answer: 'Yes, you can print a recipe from the website by clicking the "Print" button located on each recipe page. This will open a printable version of the recipe for you to print or save as a PDF.',
    },
    {
      title: 'Can I share a recipe with my friends and family?',
      answer: 'Yes, you can share a recipe with your friends and family by clicking the "Share" button located on each recipe page. You can share the recipe via email, social media, or by copying the link to share wherever you like.',
    },
    {
      title: 'How do I leave a review or rating for a recipe?',
      answer: 'You can leave a review or rating for a recipe by scrolling to the bottom of the recipe page and clicking the "Write a Review" button. Fill out the form with your review and rating, then hit the "Submit" button to have it added to the website.',
    },
    {
      title: `How do I make changes to a recipe that I've submitted?`,
      answer: 'To make changes to a recipe that you have submitted, log into your account and navigate to the recipe page. Click the "Edit" button to access the form to make changes. When you are done making changes, hit the "Save" button to update the recipe on the website.',
    },
    {
      title: 'Can I submit a recipe without a photo?',
      answer: 'Yes, you can submit a recipe without a photo. However, recipes with photos tend to receive more engagement and attention from users, so it is recommended to include a photo if possible.',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

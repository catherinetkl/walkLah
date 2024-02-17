export default function CalorieObject(
  id,
  type,
  title,
  servings,
  caloriesPerServing
) {
  this.id = id;
  this.type = type;
  this.title = title;
  this.servings = servings;
  this.caloriesPerServing = caloriesPerServing;
}

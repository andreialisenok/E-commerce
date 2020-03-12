$(document).ready(function(){

    $('.project-item').on('mouseover click', function(){
        $(this).children('.project-item__hover').addClass('hovered');
    });
    $('.project-item').on('mouseout', function(){
        $(this).children('.project-item__hover').removeClass('hovered');
    });

    $('.product-item-wrapper').on('mouseover click', function(){
        $(this).children('.product-item-description').addClass('hovered');
        $(this).find('.product-title').addClass('hovered');
    });
    $('.product-item-wrapper').on('mouseout', function(){
        $(this).children('.product-item-description').removeClass('hovered');
        $(this).find('.product-title').removeClass('hovered');
    });
});
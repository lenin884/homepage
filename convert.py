from PIL import Image
import svgwrite

def png_to_svg(png_path, svg_path):
    # Open the PNG image
    image = Image.open(png_path).convert("RGBA")
    width, height = image.size
    
    # Create an SVG drawing
    dwg = svgwrite.Drawing(svg_path, profile='tiny', size=(width, height))
    
    # Process each pixel in the image
    for y in range(height):
        for x in range(width):
            r, g, b, a = image.getpixel((x, y))
            # Only add the pixel if it's not fully transparent
            if a > 0:
                color = svgwrite.rgb(r, g, b, '%')
                dwg.add(dwg.rect(insert=(x, y), size=(1, 1), fill=color, fill_opacity=a/255))
    
    # Save the SVG file
    dwg.save()

# Paths to the input image and output SVG
image_path = "/Users/e_osipov/Downloads/image_white_background.png"
svg_path = "src/assets/workline.svg"

if __name__ == "__main__":
    # Convert the image
    png_to_svg(image_path, svg_path)

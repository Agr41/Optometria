from bs4 import BeautifulSoup

def add_name_to_input_tags(html_file):
    with open(html_file, 'r') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    input_tags = soup.find_all('input')
    for input_tag in input_tags:
        input_id = input_tag.get('id')
        input_name = input_tag.get('name')
        if input_id:
            input_tag['name'] = f'CampoDeFormulario[{input_id}]'
        elif input_name:
            input_tag['name'] = f'CampoDeFormulario[{input_name}]'

    with open(html_file, 'w') as file:
        file.write(str(soup))

html_file = 'SaludOcular.hbs'
add_name_to_input_tags(html_file)

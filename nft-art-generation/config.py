# credit: https://github.com/rounakbanik/generative-art-nft
# configuration of image properties, such as order of layering, trait types, required parts, and rarity
# id: order of the layering
# name: name of trait type
# directory: directory name in assets
# required: trait does or does not have to be added as a layer
# relative weights of each value of trait type ordered with none first and then alphabetical order

CONFIG = [
    {
        'id': 1,
        'name': 'Body', 
        'directory': 'limbs', 
        'required': True, 
        'rarity_weights': [50,5,50,25,5,100] 
    },
    {
        'id': 2,
        'name': 'Wings',
        'directory': 'wings',
        'required': True,
        'rarity_weights': [5,5,5,100]
    },
    {
        'id': 3,
        'name': 'Eyes',
        'directory': 'eyes',
        'required': True,
        'rarity_weights': [5,50,100,5,50]
    },
    {
        'id': 4,
        'name': 'Headwear',
        'directory': 'headwear',
        'required': False,
        'rarity_weights': [100,25,50,25,25]
    }
]
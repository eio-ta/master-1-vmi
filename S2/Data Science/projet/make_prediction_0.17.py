## À FAIRE POUR CHAQUE MACHINE #######################################################

import numpy as np
import pandas as pd
import csv

# Charger les tableaux depuis un fichier CSV
df = pd.read_csv('InputTrain.csv')
df = df.drop('Index', axis=1)
df = df.drop('House_id', axis=1)
data_1d = df.values.flatten()

obj = pd.read_csv('StepTwo_LabelTrain_Kettle.csv')
obj = obj.drop('Index', axis=1)
obj = obj.drop('House_id', axis=1)
obj_1d = obj.values.flatten()

# Récupérer la valeur minimale de df où was est égal à 1
min_value = np.min(data_1d[obj_1d == 1])
max_value = np.max(data_1d[obj_1d == 0])

# Charger le tableau depuis un fichier CSV
test = pd.read_csv('InputTest.csv')
test = test.drop('Index', axis=1)
test = test.drop('House_id', axis=1)
test_1d = test.values.flatten()

# Calculer les résultats en une seule fois
results = np.where(test_1d < min_value, 0, np.where(test_1d > max_value, 1, (test_1d - min_value) / (max_value - min_value)))
results = np.round(results, 2)

# Ecrire les résultats dans un fichier CSV ligne par ligne
with open('kettle.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(results.reshape(-1, 1))


## À FAIRE À LA FIN POUR CONCATENER LES CSV ##########################################

# import pandas as pd

# # Charger les fichiers CSV dans des dataframes
# df1 = pd.read_csv('wm.csv')
# df2 = pd.read_csv('Dishwasher.csv')
# df3 = pd.read_csv('t.csv')
# df4 = pd.read_csv('mw.csv')
# df5 = pd.read_csv('kettle.csv')
# df6 = pd.read_csv('index.csv')

# # Concaténer les dataframes en un seul
# concatenated_df = pd.concat([df1, df2, df3, df4, df5, df6], axis=1)

# # Écrire le dataframe concaténé dans un nouveau fichier CSV
# concatenated_df.to_csv('prediction_test.csv', index=False)
# n_values = len(concatenated_df)
# print(n_values)

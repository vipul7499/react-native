#!/usr/bin/env python
# coding: utf-8

# In[1]:

# Dependencies
from flask import Flask, request, jsonify,render_template
import pandas as pd
import numpy as np
import pickle
# import tensorflow
# import nltk.data
# from tensorflow.keras.layers import Dense, Dropout, Flatten  
# from tensorflow.keras.layers import Conv2D, MaxPooling2D
# import tensorflow.keras
# from tensorflow.keras.layers import Dense, Conv2D,Input,Lambda, Layer, Add, Multiply
# from tensorflow.keras.layers import Flatten
# from tensorflow.keras.layers import MaxPooling2D, GlobalAveragePooling2D
# from tensorflow.keras.layers import Activation
# from tensorflow.keras.layers import BatchNormalization
# from tensorflow.keras.layers import Dropout
# from tensorflow.keras.models import Sequential,Model
from tensorflow.keras.models import load_model,Model
# import keras
import firebase_admin
from firebase_admin import credentials, firestore, db
from datetime import datetime
from tensorflow.keras.models import model_from_json,Model
import json
from flask import Flask
app = Flask(__name__)

cred={
  "type": "service_account",
  "project_id": "her-hygiene",
  "private_key_id": "d7bd793fb74edfbcb96998c380d8240b4bbd1c39",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKfG8odS6jo9cH\nPZTXbdOSvgcRrhPxZmg0LrLr614Q/6yaEMKLIC1Eu9MFIrVlQDYKB3Pqg+NEQu7h\nuIk8DXfjWUDK2FA9/zLj535tJYwWqA32f/Ae5imYbF51rVCvrDfXYVwCSFyHC/MI\nJTEry4QwZ/9uD8oMsZrLXmJH2CC3JpJF81vOZUklgko22bcsbNnGdq51ImlTXpnA\n/BZKnQ3HOjJrEKxhgjWO51cBFtTzILX3wqb+VTaGnBWO815XPoCPmHzOd12sZFl3\nfPFvunBXA03s+OVKezYl+xfZKEN0HVqQk7qvXrSyZ7OAAOdRsMpU7MNzZwOtlIUb\nhC5isynLAgMBAAECggEAJBw32J+5Pw6fcNefHSIlapR//zurq8/HApNXbjJN1rs5\n5Una3+PPnuPeGJrdfZ6LZJN6rRZzJ7/GCTQXKUH/oOhQYTxdZwkFYtZsWfuptXqn\n7s9XG7ORNHETEWpkqseMN9lRhsiv05eick/rqnNDcjyBtXeUYVolEGKXJVfaUb76\nUqrQydNWWRrhEgGs43w9ZQEtRQgaVU72WFD0UKoS08ajjI9QmWg3H4Qa2JH9b4mb\nzjRV35XeLRiKebJBPCoLhD62aMX2MH+6VYP4Qk6k/JEfMjOPe4/6/c1xnv8tGLfu\nVBOqRSGm/4nDYBPWM0dvA1RTBO+Gwq5FQojHz9L7kQKBgQDzFJZYaLDAzK6THzdF\nSDxcJuAamW8rRXVrnX5eNuN1cis/8RMrKI3lNKB5uN/q3onF5ll2wgi/ZA5KzaqE\nVsqsewuxjH2zrHDiF+Q/2AMHXeAj4GZSXrOONyZ5gf5Y5QJ+U/2yGVH7dOKxcLT4\ntOftuIqYBXd37IQ9xwfGCatuMQKBgQDVP4KXEbk3WSO/ZXbQnxz3Vk7CmKI55QKV\n0Fwdpy70muYy974corh7ryNLtLqv6hhqCwioK9UuzHTaYM3zf98QsUnD4F//yWQA\nHPg1vijdcRRzO79iiz1uZYRz1msATP+y2XBcyeArJYSub0vLaRxaORu7A4PwgcAJ\nGxNLf41suwKBgQDoxO0XaeDgLuB5J6pAoOSUBfIR5p2q3Q+M5rrMs1jq7VH3H/4Q\nFPyT4OpOxTc+7K0XofZHn5TK2aBKB1ni8k2QDx/qfDMe6+EI0IIUlOCJnF53XHn/\nJIpig/NG5bFPJLVXjUxh0JdN6ObvrZLOmkWBwXaODqYRY55ang2WmUnc8QKBgH7G\nB+uphLPL0X2qY005Gm5MJ/x14xOJ+tR3jxut1TNjlvC76ZB6iDQ3dUM/iTCleagp\nMRdRH6Z3tAxTOnzFCyaQTysci9WzsziCAGlqyD6FSEQNRATghD/KKEj5Mpl2LRj1\nPWBcP2FHJ67PyX5+2XUluD+gomJrsG95YiojBT+bAoGAEfM9ySqzNh2/N7MsQVX+\nkQtGb3hkHwO/WmUjEoVkydxJiqv8KZLx3RA3Vsjwz0dW1bCbc5CjIhnu2t9REmK4\nn0VCb1IpgWNnsaCesR9r6uGQy94g2Dg0ksyJdrNyAkGV1tkA0Hwg+QwH761OOHm0\nyBrk2BabhuH9S2TqRPtEi2M=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5b50i@her-hygiene.iam.gserviceaccount.com",
  "client_id": "109622988614842244720",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5b50i%40her-hygiene.iam.gserviceaccount.com"
}
cred = credentials.Certificate(cred)
firebase_admin.initialize_app(cred)

store = firestore.client()

def get_data_model_json(ids):
    doc_ref_u = store.collection(u'users').document(ids).collection(u'log')
    docs_u = doc_ref_u.get()
    data=pd.DataFrame()
    for i in docs_u:
        p=i.to_dict()
        df = pd.json_normalize(p)
        data=pd.concat([data,df])
    if(data.empty):
        doc_ref_u = store.collection(u'users').document(ids)
        docs_u = doc_ref_u.get()
        js_u=docs_u.to_dict()
        data = pd.json_normalize(js_u)
        
    req_col=['pcos',
 'age',
 'weight',
 'height',
 'pulseRate',
 'rr',
 'regularity',
 'cycleLength',
 'hip',
 'waist',
 'weightGain',
 'skinDarkening',
 'pimples',
 'fastFood',
 'regExercise',
 'bpSystolic',
 'bpDiastolic',
 'cycleTotal']
    del_cols=list(set(data.columns.tolist())-set(req_col))
    data=data.drop(del_cols,axis=1)
    add_cols=list(set(req_col)-set(data.columns.tolist()))
    for i in add_cols:
        data[i]=np.nan
    data=data[req_col]
    
    avgvals={'pcos': 0,
 'age': 33,
 'weight': 62,
 'height': 158,
 'pulseRate': 70,
 'rr': 20,
 'regularity': 0,
 'cycleLength': 6,
 'hip': 37,
 'waist': 34,
 'weightGain': 0,
 'skinDarkening': 0,
 'pimples': 0,
 'fastFood': 1,
 'regExercise': 0,
 'bpSystolic': 106,
 'bpDiastolic': 72,
 'cycleTotal': 29}
    data=data.fillna(value=avgvals)


    doc_ref = store.collection(u'test').document(ids)
    docs = doc_ref.get()
    js=docs.to_dict()
    if(not bool(js)):
        doc_ref = store.collection(u'test').document('1')
        docs = doc_ref.get()
        js=docs.to_dict()
    return data,js


def retrainer(js,weights,df,y):
    df=df.fillna(df.mean()).round()
    df=df.reset_index(drop=True)
    for col in df.columns:
        while int(df[col][0])>1:
            df[col]=df[col]/10
    y_cycle_len=np.array(df[y])
    data_l=df.drop([y],axis=1)
    weights_list=pickle.loads(js[weights])
    model=model_from_json(js["model"])
    model.layers[0].set_weights([weights_list[0],weights_list[1]])
    model.layers[1].set_weights([weights_list[2],weights_list[3]])
    model.layers[2].set_weights([weights_list[4],weights_list[5]])
    model.compile(loss='mse',  
       optimizer='adam',       
       metrics=['accuracy'])
    x=data_l.to_numpy()
    history=model.fit(x,y_cycle_len,epochs=5)
    return model,history.history['loss'][-1]

def model_update(model_l,model_t,ids,loss):
    pickled_model =model_l.to_json()
    weights_list = model_l.get_weights()
    w_l=pickle.dumps(weights_list)

    weights_list = model_t.get_weights()
    w_t=pickle.dumps(weights_list)
    doc_ref = store.collection(u'test').document(ids)
    try:
        doc_ref.update({u'model':pickled_model, u'weightsPeriod':w_l ,u'weightsTotal':w_t})
    except:
        doc_ref.set({u'model':pickled_model, u'weightsPeriod':w_l ,u'weightsTotal':w_t})
    if(loss==np.nan):
        loss=0
    doc_ref.update({u'loss': firestore.ArrayUnion([loss])})
    doc_ref.update({u'dateUpdated': firestore.ArrayUnion([str(datetime.now())])})

def predictor(js,weights,df,y):
    weights_list=pickle.loads(js[weights])
    model=model_from_json(js["model"])
    model.layers[0].set_weights([weights_list[0],weights_list[1]])
    model.layers[1].set_weights([weights_list[2],weights_list[3]])
    model.layers[2].set_weights([weights_list[4],weights_list[5]])
    perlen=np.array(df[y].tolist())
    df=df.drop([y],axis=1)
    for col in df.columns:
        while int(df[col][0])>1:
            df[col]=int(df[col])/10
    x_scaled=df.values
    return model.predict(x_scaled)[0][0]

@app.route('/retrain', methods=['GET','POST'])
def retrain():
    text = request.get_json()
    ids=text['id']
    data,js=get_data_model_json(ids)
    model_l,hl=retrainer(js,"weightsPeriod",data,"cycleLength")
    model_t,ht=retrainer(js,"weightsTotal",data,"cycleTotal")
    model_update(model_l,model_t,ids,(hl+ht)/2)
    
    ans={"id":str(ids),"status":"updated","dataset len":str(len(data))}
    return ans


@app.route('/predict', methods=['GET','POST'])
def predict():
#     cred = credentials.Certificate("her-hygiene-firebase-adminsdk-5b50i-d7bd793fb7.json")
#     firebase_admin.initialize_app(cred)
#     store = firestore.client()
    req_col=['pcos',
 'age',
 'weight',
 'height',
 'pulseRate',
 'rr',
 'regularity',
 'cycleLength',
 'hip',
 'waist',
 'weightGain',
 'skinDarkening',
 'pimples',
 'fastFood',
 'regExercise',
 'bpSystolic',
 'bpDiastolic',
 'cycleTotal']
    
    
    text = request.get_json()
    ids=text['id']
    
    doc_ref_u = store.collection(u'users').document(ids)
    docs_u = doc_ref_u.get()
    js_u=docs_u.to_dict()
    df = pd.json_normalize(js_u)
    del_cols=list(set(df.columns.tolist())-set(req_col))
    df=df.drop(del_cols,axis=1)
    add_cols=list(set(req_col)-set(df.columns.tolist()))
    for i in add_cols:
        df[i]=np.nan
    df=df[req_col]
    print(df.columns)
    avgvals={'pcos': 0,
 'age': 33,
 'weight': 62,
 'height': 158,
 'pulseRate': 70,
 'rr': 20,
 'regularity': 0,
 'cycleLength': 6,
 'hip': 37,
 'waist': 34,
 'weightGain': 0,
 'skinDarkening': 0,
 'pimples': 0,
 'fastFood': 1,
 'regExercise': 0,
 'bpSystolic': 106,
 'bpDiastolic': 72,
 'cycleTotal': 29}
    df=df.fillna(value=avgvals)

    doc_ref = store.collection(u'test').document(ids)
    docs = doc_ref.get()
    js=docs.to_dict()
    if(not bool(js)):
        doc_ref_r = store.collection(u'test').document('1')
        docs_r = doc_ref_r.get()
        js=docs_r.to_dict()
        doc_ref = store.collection(u'test').document(ids)
        doc_ref.set({u'model':js["model"], u'weightsPeriod':js["weightsPeriod"] ,u'weightsTotal':js["weightsTotal"]})
    pl=predictor(js,"weightsPeriod",df,"cycleLength")
    tl=predictor(js,"weightsTotal",df,"cycleTotal")
    if(tl<0.20):
        tl=0.28
    ans={"p_len":str(round(pl*10)),"t_len":str(round(tl*100))}
    
#     return str(pl)
    return ans

if __name__ == "__main__":
    app.debug=True
#     app.run()


# In[ ]:





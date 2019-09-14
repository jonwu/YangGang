from flask_restplus import Namespace, fields


# class CandidateDto:
#     def __init__(self, name):
#         self.name = name
#
#     api = Namespace(name, description='user related operations')
#     user = api.model(name, {
#         'email': fields.String(required=True, description='user email address'),
#         'username': fields.String(required=True, description='user username'),
#         'password': fields.String(required=True, description='user password'),
#         'public_id': fields.String(description='user Identifier')
#     })